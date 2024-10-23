import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toast } from 'react-toastify';

const BlockUserComponent = () => {
  console.log('BlockUserComponent is rendering');
  
  const [isBlocked, setIsBlocked] = useState(false);
  const email = useSelector((state: RootState) => state.user.user?.email);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/account/socket/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Connected to WebSocket');
        stompClient.subscribe('/topic/userStatus', (message) => {
          console.log("Received message:", message);
          const blockedUserEmail = message.body;
          console.log("Blocked User Email:", blockedUserEmail);
          userBlockHandler(blockedUserEmail);
        });
      },
      onStompError: (error) => {
        console.error('STOMP error:', error);
        toast.error(`STOMP error: ${error.headers.message}`);
      },
    });

    stompClient.activate();

    return () => {
      console.log('Cleaning up WebSocket');
      stompClient.deactivate();
    };
  }, []);

  const userBlockHandler = (blockedEmail : string) => {
    console.log("Handling block for:", blockedEmail);
    if (blockedEmail === email) {
      console.log("Setting block state to true");
      setIsBlocked(true);
      toast.info("Your account is blocked by the admin");
    }
  };

  return null;
};


export default BlockUserComponent;
