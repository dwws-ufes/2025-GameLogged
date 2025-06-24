import './Landing-Page.css'
import { useState } from 'react';
import Balatro from '../blocks/Backgrounds/Balatro/Balatro';
import DecryptedText from '@/blocks/TextAnimations/DecryptedText/DecryptedText';
import LoginCard from './components/Login-Card';
import CadastroCard from './components/Cadastro-Card';

function LandingPage() {
    const [isLoginMode, setIsLoginMode] = useState(true);

    return (
        <>

            <div style={{ width: '70%', height: '100%', position: 'absolute', opacity:0.8}}>
                <Balatro
                    isRotate={false}
                    mouseInteraction={false}
                    pixelFilter={2000}
                    color1='#1833A0'
                    color2='#400571'
                    color3='#0093F5'
                />
            </div>
            <div className='landing-page-container'>
                <div className='landing-page-content'>
                    <div className='landing-page-logo'>
                        <div className='landing-page-title'>
                            <h1>GameLogged</h1>
                        </div>
                        <div className="landing-page-subtitle">
                            <DecryptedText
                                text="O save state da sua vida gamer"
                                animateOn="view"
                                revealDirection="center"
                                speed={200}
                                maxIterations={20}
                                className="revealed"
                                parentClassName="all-letters"
                                encryptedClassName="encrypted" />
                        </div>

                    </div>
                    <div className='authForm'>
                        {isLoginMode ? (
                            <LoginCard onSwitchToRegister={() => setIsLoginMode(false)} />
                        ) : (
                            <CadastroCard onSwitchToLogin={() => setIsLoginMode(true)} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage