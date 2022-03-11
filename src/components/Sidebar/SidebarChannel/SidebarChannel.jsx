import React from 'react'
import { useDispatch } from 'react-redux'
import './sidebarchannel.css'
import { setChannelInfo } from '../../../features/appSlice';

const SidebarChannel = ({ id, channelName }) => {
  const dispatch = useDispatch();
  return (
    <div className='sidebar_channel' onClick={() => 
      dispatch(
        setChannelInfo({
          channelID: id,
          channelName: channelName,
        })
      )}
    >
        <h4>
            <span className='sidebar_channel_hash'>
                #
            </span>
            {channelName}
        </h4>
    </div>
  )
}

export default SidebarChannel