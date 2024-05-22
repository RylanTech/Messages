import {
  IonCol,
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRow,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { settingsOutline } from 'ionicons/icons';
import './Menu.css';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/userContext';
interface userList {
  url: string;
  userProfilePicture: string | undefined;
  username: string;
}

const userLists: userList[] = [
  {
    username: 'Anne',
    url: '/chat/anne',
    userProfilePicture: undefined
  },
  {
    username: 'Momo',
    url: '/chat/momo',
    userProfilePicture: undefined
  },
  {
    username: 'Rylan',
    url: '/chat/rylan',
    userProfilePicture: undefined
  },
  {
    username: 'fred',
    url: '/chat/fred',
    userProfilePicture: undefined
  },
  {
    username: 'Andrew',
    url: '/chat/andrew',
    userProfilePicture: undefined
  },
  {
    username: 'Jeff',
    url: '/chat/jeff',
    userProfilePicture: undefined
  }
];

const Menu: React.FC = () => {

  const {setPrimaryColor} = useContext(UserContext)

  useEffect(() => {
    let selectedColor = localStorage.getItem("primary-color")

    console.log(selectedColor)
    if (selectedColor) {
      function hexToRgb(hex: string) {
        // Remove the leading # if it exists
        hex = hex.replace(/^#/, '');

        // Check for 3-digit hex and convert to 6-digit hex
        if (hex.length === 3) {
          hex = hex.split('').map(char => char + char).join('');
        }

        // Parse the hex string into its RGB components
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return { r, g, b };
      }
      // Convert selected color to RGB
      const { r, g, b } = hexToRgb(selectedColor);
      const colorRgb = `${r}, ${g}, ${b}`;
      const colorHex = `${selectedColor}`;

      // Update CSS variables
      document.documentElement.style.setProperty('--ion-color-primary', colorHex);
      document.documentElement.style.setProperty('--ion-color-primary-rgb', colorRgb);

      setPrimaryColor(selectedColor)
    }


  });

  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Messages</IonListHeader>
          <IonNote>username</IonNote>
          {userLists.map((userList, index) => {
            return (
              <IonMenuToggle
                key={index}
                autoHide={false}>
                <IonItem
                  className={location.pathname === userList.url ? 'selected' : ''}
                  routerLink={userList.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <img
                    className='userListProfileImage'
                    aria-hidden="true"
                    slot="start"
                    src={userList.userProfilePicture ? userList.userProfilePicture : './public/nouser.webp'} />
                  <IonLabel>
                    {userList.username}
                  </IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
      <IonFooter>
        {/* <IonMenuToggle> */}
        <IonItem
          className={location.pathname === '/settings' ? 'selected' : ''}
          routerLink={'/settings'}
          routerDirection="none"
          lines="none"
          detail={false}>
          <IonRow>
            <IonCol size='2'>
              <IonIcon
                className='settingsMenuButtonIcon'
                icon={settingsOutline} />
            </IonCol>
            <IonCol size='10'
              className='settingsMenuButtonText'>
              Settings
            </IonCol>
          </IonRow>
        </IonItem>
        {/* </IonMenuToggle> */}
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
