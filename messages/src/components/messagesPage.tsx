import { IonCol, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonRow } from '@ionic/react';
import './messagesPage.css';

interface ContainerProps {
  messages: MessageContent[]
}

interface MessageContent {
  username: string,
  message: string,
  color: string
}

let currentUser = 'currentUser'

const MesssagePage: React.FC<ContainerProps> = ({ messages }) => {

  function returingMessages() {
    console.log(messages)
    if (messages) {
      return messages.map((msg) => {
        if (msg.username === 'currentUser') {
          return (
            <IonRow>
              <IonCol size='2'>

              </IonCol>
              <IonCol size='10'>
                <div
                  className='messageFromLoggedInUser'
                  style={{
                    backgroundColor: msg.color
                  }}>
                  {msg.message}
                </div>
                <div 
                className='messageBottemLoggedInUser'
                style={{
                  backgroundColor: msg.color
                }}/>
              </IonCol>
            </IonRow>
          )
        } else {
          return (
            <IonRow>
              <IonCol size='10'>
                <div
                  className='messageFromUser'
                  style={{
                    backgroundColor: msg.color
                  }}>
                  {msg.message}
                </div>
                <div className='messageBottemUser'
                style={{
                  backgroundColor: msg.color
                }}/>
              </IonCol>
              <IonCol size='2'>

              </IonCol>
            </IonRow>
          )
        }
      })
    }
  }

  return (
    <div id="container">
      {returingMessages()}
    </div>
  );
};

export default MesssagePage;
