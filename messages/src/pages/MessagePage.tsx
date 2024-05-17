import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import './MessagePage.css';
import SelectedMessages from '../components/SelectedMessages';

const MessagePage: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const messages = [
    {
      username: "Anne",
      message: "testing message",
      color: "#33CC4E"
    },
    {
      username: 'currentUser',
      message: 'testing complete',
      color: "#A0BFE9"
    }

  ]

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
          {name ? (
            <>
            {name}
            </>
          ) : (
            <IonSkeletonText animated={true} className='skelentonText'/>
          )}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SelectedMessages messages={messages} />
      </IonContent>
    </IonPage>
  );
};

export default MessagePage;