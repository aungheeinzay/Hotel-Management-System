import IsAuthenticated from "@/components/common/IsAuthenticated.tsx";
import AvatarUpload from "@/components/profileComponents/AvatarUpload.tsx";
import UserNameEmailUpdate from "@/components/profileComponents/UserName&EmailUpdate.tsx";
import UpdatePassword from "@/components/profileComponents/UpdatePassword.tsx";

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