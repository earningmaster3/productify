import React from 'react'
import {testApi} from '../lib/api';
import { useEffect } from 'react';

const Trialpage = () => {
    useEffect(() => {
        const checkBackend = async () => {
            try {
                const response = await testApi();
                console.log("Backend connected:", response);
            } catch (error) {
                console.error("Backend not connected:", error);
            }
        };

        checkBackend();
    }, []);
}

export default Trialpage

