import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './Sidebar/SidebarChannel/SidebarChannel';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CallIcon from '@mui/icons-material/Call';
import { Avatar } from '@material-ui/core';
import MicIcon from '@mui/icons-material/Mic';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';


import './sidebar.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db, { auth } from '../firebase';
const Sidebar = () => {

  const user = useSelector(selectUser);

  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection('channels').onSnapshot(snapshot => (
      setChannels(snapshot.docs.map(doc => ({
        id: doc.id,
        channel: doc.data(),
      })))
    ));
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name.");

    if(channelName){
      db.collection('channels').add({
        channelName: channelName,
      });
    }
  };

  return (
    // This is the sidebar component. It houses the server name and options, 
    // text and voice channels, connection info, and user controls and settings.
    <div className='sidebar'>
      {/* This is the top or title component that displays the server's title. */}
        <div className='sidebar_top'>
            {/* This h3 will be the name of the current server. */}
            <h3>turtle fuckers</h3>

            {/* This ExpandMoreIcon expands to show server options.*/}
            <ExpandMoreIcon />
        </div>

        <div className='sidebars_channels'>
          {/* This div houses the sidebar channels. */}
          <div className='sidebar_channels_header'>

            <div className='sidebar_header'>
              {/* The purpose of this div is to specify the group of channels.
                  The ExpandMoreIcon will be used to show or hide them.
              */}
              <ExpandMoreIcon />
              <h4>Text Channels</h4>
            </div>

            {/* This AddIcon will be used as a button to add more channels. */}
            <AddIcon onClick={handleAddChannel} className="sidebar_add_channel" />
          </div>
        </div>

      
      <div className='sidebar_channels_list'>
        {/* The main part of this component: text channels. Or... at least the list of them. */}
        {channels.map(({id, channel}) => (
          <SidebarChannel key={id} id={id} channelName={channel.channelName}/>
        ))}
      </div>

      <div className='sidebar_voice'>
        {/*
            This div is a fancy placeholder that shows what you would see
            when connected to a voice channel. Currently, this app does not
            support voice communication or voice channels.
         */}
        <SignalCellularAltIcon className='sidebar_connection_icon' fontSize="large" />

        <div className='sidebar_voice_info'>
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className='sidebar_voice_icons'>
          {/* 
              Functionally, these buttons are useless as there is no
              voice implementation in this project. However, these buttons
              would be used to display info about the connection or leave
              a currently joined voice channel.
          */}
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>

      <div className='sidebar_profile'>

        {/* This is the user profile section of the sidebar. */}
        <Avatar onClick={() => auth.signOut()} src={user.photo}/>
        <div className='sidebar_profile_info'>
          {/* The actual user info: username and discriminator. */}
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 4)}</p>
        </div>

        <div className='sidebar_profile_icons'>
          {/* This div contains the mute, deafen, and user settings buttons.*/}
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  )
}

export default Sidebar;