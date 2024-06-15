export default function Profile ({profileId}:{profileId:string}){
    return (
        <div className="text-white text-lg flex flex-col items-center justify-center">
            <h1>profile</h1>
            <hr/>
            <h1>this is {profileId} profile</h1>
        </div>
    )
} 