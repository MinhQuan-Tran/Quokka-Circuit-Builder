import React, {useState} from 'react';
import styles from '../Grid.module.scss';

interface AddQubitActionBtnProps {
    x: number
    y: number
    onClick : any
}

const AddQubitActionBtn : React.FC<AddQubitActionBtnProps> = (children) => {

    const {x, y, onClick} = children;
    const relativePosition = `translate(${x},${y})`;

    return (<g className={styles.addQubitActionBtn} onClick={onClick} transform={relativePosition}>
        <circle  className={styles.addQubitCircle}  cx="15.5" cy="13.5" r="11.5"/>
        <path d="M16.4994 9.568V12.736H19.4594V14.512H16.4994V17.696H14.4834V14.512H11.5394V12.736H14.4834V9.568H16.4994Z" fill="white"/>

        <defs>
            <linearGradient id="circleDefaultBkg" x1="8.2521" y1="2" x2="23.312" y2="2.77514" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6091F1"/>
                <stop offset="1" stopColor="#5E77AA"/>
            </linearGradient>
        </defs>
        <defs>
            <filter id="circleShadow" x="0" y="0" width="39" height="39" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="2"/>
                <feGaussianBlur stdDeviation="4"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_365_4082"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_365_4082" result="shape"/>
            </filter>
            <linearGradient id="circleHoveredBkg" x1="8" y1="6" x2="32.3424" y2="7.5214" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#4473CF"/>
                <stop offset="1" stopColor="#375083"/>
            </linearGradient>
        </defs>

    </g>)
}

export default AddQubitActionBtn;
