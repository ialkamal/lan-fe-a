import styled from 'styled-components';

const LandingContainer = styled.div`
    height: 100vh;
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .loading {
        height: 85vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
            margin-bottom: 8px;
            height: 32px;
            width: 32px;
            animation: loading-icon-spin infinite 1s linear;
        }

        p {
            font-size: 1rem;
            font-weight: 500;
            color: #ffffff;
        }

        @keyframes  loading-icon-spin {
            from {
                transform: rotate(0deg);
            }
    
            to {
                transform: rotate(360deg);
            }
        }
    }

    .left-section-container {
        .left-section {
            max-width: 372.6px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .logo-and-name {
                margin-bottom: 4px;
                display: flex;
                align-items: center;

                img {
                    height: 32px;
                    width: 32px;
                    margin-right: 8px;
                }

                h1 {
                    font-size: 2rem;
                    font-weight: 600;
                    color: #ffffff;
                }
            }
            
            .description {
                font-size: 1rem;
                color: #ffffff;
            }
        }
    }

    .right-section-container {
        .right-section {
            max-width: 372.6px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;

            h2 {
                margin-bottom: 16px;
                font-size: 1.75rem;
                font-weight: 600;
                color: #ffffff;
            }

            .social-media-link {
                text-decoration: none;

                :last-of-type {
                    button {
                        margin-bottom: 8px;
                    }
                }
            }
                
            button {
                width: 100%;
                padding: 10px;
                margin-bottom: 12px;
                background-color: #2c2f33;
                border: none;
                border-radius: 3px;
                font-family: 'Nunito', sans-serif;
                font-size: 1rem;
                color: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: 0.25s;

                img {
                    margin-right: 8px;
                    height: 24px;
                    width: 24px;
                }

                :hover {
                    opacity: 0.5;
                }
            }

            .terms {
                // margin-bottom: 16px;
                font-size: 0.875rem;
                color: #ffffff;

                a {
                    color: #ffffff;
                    transition: 0.25s;

                    :hover {
                        opacity: 0.5;
                    }
                }
            }

            .instead {
                font-size: 0.875rem;
                color: #ffffff;

                a {
                    color: #ffffff;
                    transition: 0.25s;

                    :hover {
                        opacity: 0.5;
                    }
                }
            }
        }
    }

    @media(min-width: 1024px) {
        width: 972.8px;
        flex-direction: row;

        .left-section-container {
            width: 50%;

            .left-section {
                height: 90vh;
            }
        }

        .right-section-container {
            width: 50%;

           .right-section {
                height: 90vh;
           }
        }
    }
`;

export default LandingContainer;