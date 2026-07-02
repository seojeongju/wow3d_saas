import type { Metadata } from "next";
import LocationsContent from "./LocationsContent";

export const metadata: Metadata = {
  title: "센터 안내 | (주)와우쓰리디",
  description: "서울 홍대, 경북 구미, 전북 전주 센터 주소·연락처 안내.",
};

export default function LocationsPage() {
  return <LocationsContent />;
}
