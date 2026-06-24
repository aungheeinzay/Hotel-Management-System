import IsAuthenticated from "@/components/common/IsAuthenticated.tsx";
import AvatarUpload from "@/components/common/profileComponents/AvatarUpload.tsx";
import UserNameEmailUpdate from "@/components/common/profileComponents/UserName&EmailUpdate.tsx";
import UpdatePassword from "@/components/common/profileComponents/UpdatePassword.tsx";

function Page(){
    return(
        <section className={"layout space-y-4"}>
            <AvatarUpload/>
            <UserNameEmailUpdate/>
            <UpdatePassword/>
        </section>
    )
}

const ProfilePage= IsAuthenticated(Page)
export default ProfilePage