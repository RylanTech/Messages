import { IonButtons, IonCol, IonContent, IonHeader, IonInput, IonMenuButton, IonPage, IonRow, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/react';


const LoginPage: React.FC = () => {

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonRow>
            <IonCol>
                Name
                <IonInput type='text'/>
            </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
