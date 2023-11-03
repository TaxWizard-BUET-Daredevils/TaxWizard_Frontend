'use client';
import React from 'react';
import LoginForm from '../../components/login/Form';
import Welcome from '../../components/login/Welcome';

const Page = () => {
    return (
        <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
            <div style={{ flex: 1 }}>
                <Welcome />
            </div>
            <div style={{ flex: 1 }}>
                <LoginForm />
            </div>
        </div>
    );
}

export default Page;
