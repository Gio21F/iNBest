import React from 'react'

interface Props {
  width: string;
  height: string;
}

export const Loading = ({ width, height }:Props) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <svg className='animate-spin' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={ width } height={ height } viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve" fill="#ffffff" stroke="#ffffff">

            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

            <g id="SVGRepo_iconCarrier"> <g id="Download_x5F_25_x25_"> </g> <g id="Download_x5F_50_x25_"> </g> <g id="Download_x5F_75_x25_"> </g> <g id="Download_x5F_100_x25_"> </g> <g id="Upload"> </g> <g id="Next"> </g> <g id="Last"> </g> <g id="OK"> </g> <g id="Fail"> </g> <g id="Add"> </g> <g id="Spinner_x5F_0_x25_"> </g> <g id="Spinner_x5F_25_x25_"> <g> <path fill="none" stroke="#ffffff" strokeWidth="4" strokeLinejoin="round" strokeMiterlimit="10" d="M50.188,26.812 c12.806,0,23.188,10.381,23.188,23.188"/> <g> <circle cx="73.375" cy="50" r="1.959"/> <circle cx="72.029" cy="57.704" r="1.959"/> <circle cx="68.237" cy="64.579" r="1.959"/> <circle cx="62.324" cy="69.759" r="1.959"/> <circle cx="55.013" cy="72.699" r="1.959"/> </g> <g> <ellipse transform="matrix(0.9968 -0.0794 0.0794 0.9968 -4.0326 2.3121)" cx="27.045" cy="51.843" rx="1.959" ry="1.959"/> <ellipse transform="matrix(0.9968 -0.0794 0.0794 0.9968 -4.628 2.4912)" cx="28.998" cy="59.416" rx="1.959" ry="1.959"/> <ellipse transform="matrix(0.9968 -0.0794 0.0794 0.9968 -5.1348 2.8556)" cx="33.325" cy="65.967" rx="1.959" ry="1.959"/> <ellipse transform="matrix(0.9968 -0.0794 0.0794 0.9968 -5.4877 3.3713)" cx="39.63" cy="70.661" rx="1.959" ry="1.959"/> <ellipse transform="matrix(0.9968 -0.0794 0.0794 0.9968 -5.6506 3.9762)" cx="47.152" cy="73.012" rx="1.959" ry="1.959"/> </g> <g> <ellipse transform="matrix(0.9962 -0.0867 0.0867 0.9962 -3.713 2.567)" cx="27.71" cy="44.049" rx="1.959" ry="1.959"/> <ellipse transform="matrix(0.9962 -0.0867 0.0867 0.9962 -3.079 2.8158)" cx="30.892" cy="36.872" rx="1.959" ry="1.959"/> <ellipse transform="matrix(0.9962 -0.0867 0.0867 0.9962 -2.567 3.266)" cx="36.334" cy="31.199" rx="1.959" ry="1.959"/> <ellipse transform="matrix(0.9962 -0.0867 0.0867 0.9962 -2.2318 3.8617)" cx="43.363" cy="27.636" rx="1.959" ry="1.959"/> </g> </g> </g> <g id="Spinner_x5F_50_x25_"> </g> <g id="Spinner_x5F_75_x25_"> </g> <g id="Brightest_x5F_25_x25_"> </g> <g id="Brightest_x5F_50_x25_"> </g> <g id="Brightest_x5F_75_x25_"> </g> <g id="Brightest_x5F_100_x25_"> </g> <g id="Reload"> </g> <g id="Forbidden"> </g> <g id="Clock"> </g> <g id="Compass"> </g> <g id="World"> </g> <g id="Speed"> </g> <g id="Microphone"> </g> <g id="Options"> </g> <g id="Chronometer"> </g> <g id="Lock"> </g> <g id="User"> </g> <g id="Position"> </g> <g id="No_x5F_Signal"> </g> <g id="Low_x5F_Signal"> </g> <g id="Mid_x5F_Signal"> </g> <g id="High_x5F_Signal"> </g> <g id="Options_1_"> </g> <g id="Flash"> </g> <g id="No_x5F_Signal_x5F_02"> </g> <g id="Low_x5F_Signal_x5F_02"> </g> <g id="Mid_x5F_Signal_x5F_02"> </g> <g id="High_x5F_Signal_x5F_02"> </g> <g id="Favorite"> </g> <g id="Search"> </g> <g id="Stats_x5F_01"> </g> <g id="Stats_x5F_02"> </g> <g id="Turn_x5F_On_x5F_Off"> </g> <g id="Full_x5F_Height"> </g> <g id="Full_x5F_Width"> </g> <g id="Full_x5F_Screen"> </g> <g id="Compress_x5F_Screen"> </g> <g id="Chat"> </g> <g id="Bluetooth"> </g> <g id="Share_x5F_iOS"> </g> <g id="Share_x5F_Android"> </g> <g id="Love__x2F__Favorite"> </g> <g id="Hamburguer"> </g> <g id="Flying"> </g> <g id="Take_x5F_Off"> </g> <g id="Land"> </g> <g id="City"> </g> <g id="Nature"> </g> <g id="Pointer"> </g> <g id="Prize"> </g> <g id="Extract"> </g> <g id="Play"> </g> <g id="Pause"> </g> <g id="Stop"> </g> <g id="Forward"> </g> <g id="Reverse"> </g> <g id="Next_1_"> </g> <g id="Last_1_"> </g> <g id="Empty_x5F_Basket"> </g> <g id="Add_x5F_Basket"> </g> <g id="Delete_x5F_Basket"> </g> <g id="Error_x5F_Basket"> </g> <g id="OK_x5F_Basket"> </g> </g>

        </svg>
    </div>
  )
}
