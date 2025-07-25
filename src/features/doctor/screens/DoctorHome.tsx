import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";

import DashboardHeader from "../components/DashboardHeader";
import DoctorSearchBar from "../components/DoctorSearchBar";
import QuickActions from "../components/QuickActions";
import DashboardStats from "../components/DashboardStats";
import RecentPatients from "../components/RecentPatients";

const DoctorHome: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-background-50 ">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <DashboardHeader />

        {/* Main Content */}
        <Box className="flex-1 px-4 -mt-4">
          <VStack space="md" className="w-full">
            {/* Search Section - Removed Card wrapper */}
            <Box className="mt-2 z-50">
              <DoctorSearchBar />
            </Box>

            {/* Quick Actions */}
            <Box className="z-10">
              <QuickActions />
            </Box>

            {/* Statistics Cards */}
            <Box className="z-10">
              <DashboardStats />
            </Box>

            {/* Recent Patients Section */}
            <Box className="z-10">
              <RecentPatients />
            </Box>

            {/* Bottom Spacing */}
            <Box className="h-8" />
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorHome;
