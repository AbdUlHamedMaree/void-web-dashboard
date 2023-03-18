import { redirectServerProps } from '$logic/helpers/redirect-server-props';
import { SplashPage } from '$ui/components/shared/splash-page';

export default SplashPage;

export const getServerSideProps = redirectServerProps('view');
