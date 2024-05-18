import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonMenuButton, IonPage, IonRow, IonSkeletonText, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { useContext, useState } from 'react';
import { UserContext, user } from '../contexts/userContext';


const LoginPage: React.FC = () => {
  const [message, setMessage] = useState<string>()
  const [user, setUser] = useState<user>({
    displayName: "",
    password: "",
  });

  const { signin } = useContext(UserContext)
  const router = useIonRouter()

  const handleInputChange = (name: string, value: string | number) => {
    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    let i = await signin(user)
    if (i) {
      if (i.login) {
        router.push('/')
      }
    } else {
      setMessage("Login failure")
    }
  };


  return (
    <IonPage>
      <IonContent fullscreen>
        <IonRow>
          <IonCol size="12">
            <IonInput
              className={`ion-input-field`}
              required
              type="text"
              label="Username"
              labelPlacement="floating"
              value={user.displayName}
              onIonInput={(e) => handleInputChange("displayName", e.detail.value!)}
            />
          </IonCol>
          <IonCol size="12">
            <IonInput
              className={`ion-input-field`}
              required
              type="password"
              label="Password"
              labelPlacement="floating"
              value={user.password}
              onIonInput={(e) => handleInputChange("password", e.detail.value!)}
            />
          </IonCol>
          <IonCol size="12">
            <IonButton
              expand="full"
              onClick={handleSubmit}
            >
              Submit
            </IonButton>
          </IonCol>
          <IonCol>
            {message ? (
              <div>
                {message}
              </div> 
            ) : (
              <>
              </>
            )}
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
