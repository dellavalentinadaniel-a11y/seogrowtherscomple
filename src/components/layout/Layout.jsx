
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import CustomCursor from '@/components/shared/CustomCursor';
import BottomTabBar from '@/components/layout/BottomTabBar';
import { MobileMenuProvider } from '@/contexts/MobileMenuContext';

const Layout = () => {
  return (
    <MobileMenuProvider>
      <CustomCursor />
      <div className="min-h-screen text-white overflow-x-hidden flex flex-col pb-16 md:pb-0">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <BottomTabBar />
        <Toaster />
      </div>
    </MobileMenuProvider>
  );
};

export default Layout;
