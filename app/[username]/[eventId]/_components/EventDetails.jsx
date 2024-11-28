import { Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EventDetails({ event }) {
  const { user } = event;

   return (
     <div className="p-10 lg:w-1/3 bg-primary/15">
       <h1 className="text-3xl font-bold mb-4 text-blue-800">{event.title}</h1>
       <div className="flex items-center mb-4">
         <Avatar className="w-12 h-12 mr-4">
           <AvatarImage src={user.imageUrl} alt={user.name} />
           <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
         </Avatar>
         <div>
           <h2 className="text-2xl font-semibold text-primary">{user.name}</h2>
           <p className="text-primary font-light">{user.email}</p>
         </div>
       </div>
       <div className="flex items-center mb-2 text-primary">
         <Clock className="mr-2 " />
         <span className="font-semibold">{event.duration} minutes</span>
       </div>
       <div className="flex items-center mb-4 text-primary">
         <Calendar className="mr-2" />
         <span className="font-semibold">Google Meet</span>
       </div>
       <p className="text-slate-700">{event.description}</p>
     </div>
   );
}
