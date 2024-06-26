import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import MesssagePage from './pages/MessagePage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/Settings';
import { useContext, useState } from 'react';
import { UserContext } from './contexts/userContext';
import { registerPlugin } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';

const keyboard = registerPlugin('Keyboard', {
  web: () => import('@capacitor/keyboard').then(m => m.Keyboard),
});


setupIonicReact();

const App: React.FC = () => {
  
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/chat/rylan" />
            </Route>
            <Route path="/chat/:name" exact={true}>
              <MesssagePage />
            </Route>
            <Route path="/settings" exact={true}>
              <SettingsPage/>
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
