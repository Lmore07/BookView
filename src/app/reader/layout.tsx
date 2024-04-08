import Header from "@/ui/components/header/header";
import Sidebar from "@/ui/components/sidebar/sideBarReader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header category="" projectName=""></Header>
          <main className="overflow-y-auto p-10">{children}</main>
      </div>
    </div>
  );
}
