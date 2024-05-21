import { IonButtons, IonCol, IonContent, IonHeader, IonMenuButton, IonPage, IonRow, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/react';
import './SettingsPage.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/userContext';

const SettingsPage: React.FC = () => {

    const [colors, setColors] = useState<Array<string>>([
        "0054E9",
        "E21D34",
        "57CD32",
        "E6DF19"
    ]);

    const { getPrimaryColor } = useContext(UserContext)

    useEffect(() => {
        async function gettingPrimaryColor() {
            let primaryColor = await getPrimaryColor()
            colors.map((color) => {
                if (`#${color}` === primaryColor) {
                    let selectedColorObject = document.getElementById(color);
                    selectedColorObject?.classList.add('colorSelected');
                }
            })
        }
        gettingPrimaryColor()
    }, [])

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


    function setCurrentColor(selectedColor: string) {
        colors.map((color) => {
            let colorObject = document.getElementById(color);
            colorObject?.classList.remove('colorSelected');
        });

        let selectedColorObject = document.getElementById(selectedColor);
        selectedColorObject?.classList.add('colorSelected');

        // Convert selected color to RGB
        const { r, g, b } = hexToRgb(selectedColor);
        const colorRgb = `${r}, ${g}, ${b}`;
        const colorHex = `#${selectedColor}`;

        // Update CSS variables
        document.documentElement.style.setProperty('--ion-color-primary', colorHex);
        document.documentElement.style.setProperty('--ion-color-primary-rgb', colorRgb);

        localStorage.setItem("primary-color", colorHex)

    }




    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar className='messageToolBar'>
                    </IonToolbar>
                </IonHeader>
                <IonRow>
                    <IonCol size='12'>
                        <center>
                            <b>Select Color:</b>
                        </center>
                    </IonCol>
                    <IonCol size='3' />
                    <IonCol size='6'
                        className='colorSelectParent'>
                        {colors.map((color) => {
                            return (
                                <>
                                    <div className={`colorSelect colorSelect${color}`}
                                        id={color}
                                        onClick={() => setCurrentColor(color)}
                                        key={color} />
                                </>
                            )
                        })}
                    </IonCol>
                    <IonCol size='3' />
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default SettingsPage;

