import IsAuthenticated from "@/components/common/IsAuthenticated.tsx";


function Page(){
    return <div> dashboard</div>
}

export const DashboardPage = IsAuthenticated(Page,"admin")