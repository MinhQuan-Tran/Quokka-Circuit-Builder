import React from 'react';
import styles from './Qubit.module.scss';

interface QubitSymbolProps {
    x: number
    y: number
    isSelected : boolean
    onClick : any
}

const QubitSymbol: React.FC<QubitSymbolProps> = (children) => {
    const {x, y, isSelected, onClick} = children;
    const relativePosition = `translate(${x},${y})`

    const qubitSelectionBoxStyle = [styles.qubitSelectionBox];
    const selectionRectStyle = [styles.selectionBox];

    if (isSelected) {
        qubitSelectionBoxStyle.push(styles.selected);
        selectionRectStyle.push(styles.selected);
    }

    return (<g className={styles.qubitSelectionBox} onClick={onClick} transform={relativePosition}>

            <rect className={selectionRectStyle.join(' ')} width={38} height={37} fill="transparent"/>
            <path z='3' d="M11.5934 13.624H13.1294V28.752H11.5934V13.624ZM23.3253 20.216C23.3253 21.224 23.216 22.1013 22.9973 22.848C22.784 23.5893 22.4853 24.2027 22.1013 24.688C21.7226 25.1733 21.272 25.536 20.7493 25.776C20.232 26.0107 19.672 26.128 19.0693 26.128C18.4666 26.128 17.9066 26.0107 17.3893 25.776C16.8773 25.536 16.432 25.1733 16.0533 24.688C15.6746 24.2027 15.3786 23.5893 15.1653 22.848C14.952 22.1013 14.8453 21.224 14.8453 20.216C14.8453 19.2027 14.952 18.3253 15.1653 17.584C15.3786 16.8427 15.6746 16.2293 16.0533 15.744C16.432 15.2587 16.8773 14.8987 17.3893 14.664C17.9066 14.424 18.4666 14.304 19.0693 14.304C19.672 14.304 20.232 14.424 20.7493 14.664C21.272 14.8987 21.7226 15.2587 22.1013 15.744C22.4853 16.2293 22.784 16.8427 22.9973 17.584C23.216 18.3253 23.3253 19.2027 23.3253 20.216ZM21.2853 20.216C21.2853 19.3787 21.224 18.6853 21.1013 18.136C20.9786 17.5867 20.8133 17.1493 20.6053 16.824C20.4026 16.4987 20.168 16.272 19.9013 16.144C19.6346 16.0107 19.3573 15.944 19.0693 15.944C18.7866 15.944 18.512 16.0107 18.2453 16.144C17.984 16.272 17.752 16.4987 17.5493 16.824C17.3466 17.1493 17.184 17.5867 17.0613 18.136C16.944 18.6853 16.8853 19.3787 16.8853 20.216C16.8853 21.0533 16.944 21.7467 17.0613 22.296C17.184 22.8453 17.3466 23.2827 17.5493 23.608C17.752 23.9333 17.984 24.1627 18.2453 24.296C18.512 24.424 18.7866 24.488 19.0693 24.488C19.3573 24.488 19.6346 24.424 19.9013 24.296C20.168 24.1627 20.4026 23.9333 20.6053 23.608C20.8133 23.2827 20.9786 22.8453 21.1013 22.296C21.224 21.7467 21.2853 21.0533 21.2853 20.216Z" fill="#222225"/>
            <path z='3' d="M25.5706 28.328C25.2932 28.328 25.0639 28.28 24.8826 28.184C24.7119 28.0987 24.6266 27.9813 24.6266 27.832C24.6266 27.7573 24.6479 27.6347 24.6906 27.464C24.7332 27.304 24.7919 27.0907 24.8666 26.824L26.7226 20.392L24.8666 13.976C24.7172 13.4747 24.6426 13.128 24.6426 12.936C24.6426 12.7973 24.7279 12.6853 24.8986 12.6C25.0799 12.5147 25.3039 12.472 25.5706 12.472C25.6879 12.472 25.7892 12.4987 25.8746 12.552C25.9599 12.5947 26.0292 12.6907 26.0826 12.84L28.4186 19.816C28.4292 19.848 28.4559 19.9227 28.4986 20.04C28.5412 20.1467 28.5626 20.264 28.5626 20.392C28.5626 20.5307 28.5412 20.6533 28.4986 20.76C28.4559 20.856 28.4292 20.9253 28.4186 20.968L26.0826 27.96C26.0292 28.1093 25.9599 28.2053 25.8746 28.248C25.7892 28.3013 25.6879 28.328 25.5706 28.328Z" fill="#222225"/>)
            <defs>
                <filter id="selectedQubitShadow" x="0" y="0" width="42" height="42" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="2"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_365_4133"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_365_4133" result="shape"/>
                </filter>
                <linearGradient id="selected_qubit_background" x1="10.2857" y1="2" x2="32.5482" y2="3.14586" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#BECAE3"/>
                    <stop offset="1" stopColor="#D8E0EF"/>
                </linearGradient>
            </defs>
        </g>
   )
}

export default QubitSymbol;
