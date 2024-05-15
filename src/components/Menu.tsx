import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';

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
                  detail={false}>
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
    </IonMenu>
  );
};

export default Menu;
