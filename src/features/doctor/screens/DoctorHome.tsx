import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";

import DashboardHeader from "../components/DashboardHeader";
import DoctorSearchBar from "../components/DoctorSearchBar";
import QuickActions from "../components/QuickActions";
import DashboardStats from "../components/DashboardStats";
import RecentPatients from "../components/RecentPatients";

const DoctorHome: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <DashboardHeader />

        {/* Main Content */}
        <Box className="flex-1 px-6 -mt-6">
          <VStack space="lg" className="w-full">
            {/* Search Section */}
            <Card className="shadow-sm p-4">
              <DoctorSearchBar />
            </Card>

            {/* Quick Actions */}
            <QuickActions />

            {/* Statistics Cards */}
            <DashboardStats />

            {/* Recent Patients Section */}
            <RecentPatients />

            {/* Bottom Spacing */}
            <Box className="h-6" />
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorHome;
