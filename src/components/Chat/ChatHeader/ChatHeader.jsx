import React from 'react'
import './chatheader.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditLocationRoundedIcon from '@mui/icons-material/EditLocationRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
const ChatHeader = ({ channelName }) => {
  return (
    <div className='chat_header'>
        <div className='chat_header_left'>
            <h3>
                <span className='chat_header_hash'>#</span>
                {channelName}
            </h3>
        </div>
        <div className='chat_header_right'>
            <NotificationsIcon />
            <EditLocationRoundedIcon />
            <PeopleAltRoundedIcon />

            <div className='chat_header_search'>
                <input placeholder='Search' />
                <SearchRoundedIcon />
                
            </div>

            <SendRoundedIcon />
            <HelpRoundedIcon />
        </div>
    </div>
  )
}

export default ChatHeader