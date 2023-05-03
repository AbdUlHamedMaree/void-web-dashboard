import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Grid } from '@mui/material';
import type { DefaultValues } from '@mrii/react-form-builder';
import { FormBuilderProvider } from '@mrii/react-form-builder';
import { useFormBuilder } from '@mrii/react-form-builder';
import { FormSubmitInput, TextInput } from '@mrii/react-form-builder';
import { object, string } from 'yup';
import type { SubmitHandler } from 'react-hook-form';
import type { Geofence, GeofenceModel, GeofenceTypeUnion } from '$logic/models/geofence';
import { GeofenceTypeEnum } from '$logic/models/geofence';
import '$modules/yup-empty-to-null';
import { NewEditPage } from '$ui/components/dumb/new&edit-page';
import { DrawingManagerF } from '@react-google-maps/api';
import type { GoogleMapsProps } from '$ui/components/dumb/google-maps';
import { GoogleMaps } from '$ui/components/dumb/google-maps';
import { getGeofenceCenter } from '$logic/helpers/get-geofence-center';
import { isValidGeofence } from '$logic/helpers/is-valid-geofence';
import { GeofenceFactory } from '$ui/components/dumb/geofence-factory';

// omit will destroy the union
// type FormFields = Omit<GeofenceModel, 'id'>;
type FormFields = GeofenceModel;

const googleMapsLibraries: GoogleMapsProps['libraries'] = ['drawing'];

const schema = object({
  name: string().trim().required(),
  description: string().trim().required(),
  type: string()
    .oneOf<GeofenceTypeUnion>(Object.keys(GeofenceTypeEnum) as GeofenceTypeUnion[])
    .required(),

  // TODO: implement with `zod` later

  // // circle
  // center: locationSchema.when('type', {
  //   is: 'circle',
  //   then: s => s.required(),
  //   otherwise: s => s.optional(),
  // }),
  // radius: number().when('type', {
  //   is: 'circle',
  //   then: s => s.required(),
  //   otherwise: s => s.optional(),
  // }),

  // // marker
  // position: locationSchema.when('type', {
  //   is: 'marker',
  //   then: s => s.required(),
  //   otherwise: s => s.optional(),
  // }),

  // // polygon
  // paths: array(locationSchema).when('type', {
  //   is: 'polygon',
  //   then: s => s.required(),
  //   otherwise: s => s.optional(),
  // }),

  // // polyline
  // path: array(locationSchema).when('type', {
  //   is: 'polyline',
  //   then: s => s.required(),
  //   otherwise: s => s.optional(),
  // }),

  // // rectangle
  // bounds: boundsSchema.when('type', {
  //   is: 'rectangle',
  //   then: s => s.required(),
  //   otherwise: s => s.optional(),
  // }),
});

const baseDefaultValues: DefaultValues<FormFields> = {
  name: '',
  description: '',
};

export type DashboardGeofencesNewEditFormProps = {
  mode?: 'new' | 'edit';
  onSubmit?: SubmitHandler<FormFields>;
  defaultValues?: DefaultValues<FormFields>;
};

export const DashboardGeofencesNewEditForm: React.FC<
  DashboardGeofencesNewEditFormProps
> = ({ mode = 'new', onSubmit, defaultValues: propsDefaultValues }) => {
  const previousOverlayRef =
    useRef<google.maps.drawing.OverlayCompleteEvent['overlay']>(null);

  const [defaultGeofence, setDefaultGeofence] = useState<Geofence>();
  const [map, setMap] = useState<google.maps.Map>();
  const [drawingManager, setDrawingManager] =
    useState<google.maps.drawing.DrawingManager>();

  const isNew = useMemo(() => mode === 'new', [mode]);

  const defaultValues = useMemo(
    () => ({
      ...baseDefaultValues,
      ...propsDefaultValues,
    }),
    [propsDefaultValues]
  );

  const initialGeofence = useMemo(
    () =>
      isValidGeofence(defaultValues) ? (
        <GeofenceFactory onLoad={setDefaultGeofence} {...defaultValues} />
      ) : null,
    [defaultValues]
  );

  const center = useMemo(
    () => (isValidGeofence(defaultValues) ? getGeofenceCenter(defaultValues) : undefined),
    [defaultValues]
  );

  const form = useFormBuilder({
    validation: schema,
    onSubmit,
    defaultValues,
  });

  const handleOverlayComplete = useCallback(
    ({ type, overlay }: google.maps.drawing.OverlayCompleteEvent) => {
      if (!overlay) return;

      previousOverlayRef.current?.setMap(null);
      previousOverlayRef.current = overlay;

      defaultGeofence?.setMap(null);

      const OverlayType = google.maps.drawing.OverlayType;

      switch (type) {
        case OverlayType.CIRCLE:
          const circle = overlay as google.maps.Circle;

          form.setValue('type', 'circle');
          const center = circle.getCenter();
          center && form.setValue('center', center.toJSON());
          form.setValue('radius', circle.getRadius());
          return;

        case OverlayType.MARKER:
          const marker = overlay as google.maps.Marker;

          form.setValue('type', 'marker');
          const position = marker.getPosition();
          position && form.setValue('position', position.toJSON());
          return;

        case OverlayType.POLYGON:
          const polygon = overlay as google.maps.Polygon;

          form.setValue('type', 'polygon');
          form.setValue(
            'paths',
            polygon
              .getPath()
              .getArray()
              .map(l => l.toJSON())
          );
          return;

        case OverlayType.POLYLINE:
          const polyline = overlay as google.maps.Polyline;

          form.setValue('type', 'polyline');
          form.setValue(
            'path',
            polyline
              .getPath()
              .getArray()
              .map(l => l.toJSON())
          );
          return;

        case OverlayType.RECTANGLE:
          const rectangle = overlay as google.maps.Rectangle;

          form.setValue('type', 'rectangle');
          const bounds = rectangle.getBounds();
          bounds && form.setValue('bounds', bounds.toJSON());
          return;
      }
    },
    [defaultGeofence, form]
  );

  // using this method, because using props cause multiple calls to the event.
  useEffect(() => {
    if (drawingManager) {
      const listener = drawingManager.addListener(
        'overlaycomplete',
        handleOverlayComplete
      );

      return () => {
        listener.remove();
      };
    }
  }, [drawingManager, handleOverlayComplete]);

  return (
    <NewEditPage
      resourceTitle='Geofence'
      itemDisplayName={defaultValues.name}
      mode={mode}
    >
      <FormBuilderProvider {...form}>
        <Grid container spacing={2}>
          <Grid md={6} xs={12} item sx={{ minHeight: 400, height: '60vh' }}>
            <GoogleMaps center={center} libraries={googleMapsLibraries} onLoad={setMap}>
              <DrawingManagerF onLoad={setDrawingManager} />
              {initialGeofence}
            </GoogleMaps>
          </Grid>
          <Grid md={6} xs={12} item>
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid xs={12} item>
                <TextInput name='name' fullWidth />
              </Grid>
              <Grid xs={12} item>
                <TextInput name='description' fullWidth />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <FormSubmitInput size='large' variant='contained'>
            {isNew ? 'Create Geofence' : 'Save Changes'}
          </FormSubmitInput>
        </Box>
      </FormBuilderProvider>
    </NewEditPage>
  );
};
