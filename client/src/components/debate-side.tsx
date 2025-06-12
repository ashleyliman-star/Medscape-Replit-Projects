import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown, ClipboardList } from "lucide-react";
import AccordionArgument from "./accordion-argument";

interface Physician {
  name: string;
  credentials: string;
  institution: string;
  image: string;
}

interface Argument {
  title: string;
  points: string[];
}

interface DebateSideProps {
  position: string;
  color: 'blue' | 'green';
  physician: Physician;
  statement: string;
  argumentsList: Argument[];
  guidelines: string;
  showPhysician: boolean;
}

export default function DebateSide({
  position,
  color,
  physician,
  statement,
  argumentsList,
  guidelines,
  showPhysician
}: DebateSideProps) {
  const sideClass = color === 'blue' ? 'debate-side-a' : 'debate-side-b';
  const textColor = color === 'blue' ? 'text-blue-600' : 'text-green-600';
  const bgColor = color === 'blue' ? 'bg-blue-50' : 'bg-green-50';
  const icon = color === 'blue' ? ThumbsUp : ThumbsDown;
  const Icon = icon;

  return (
    <div className={`${sideClass} rounded-xl p-6 shadow-lg`}>
      {showPhysician && (
        <div className="physician-profile mb-6">
          <h4 className={`text-2xl font-bold ${textColor} mb-4 flex items-center justify-center`}>
            <Icon className="mr-2 h-5 w-5" />
            {position}
          </h4>
          <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white shadow-lg">
            <AvatarImage src={physician.image} alt={physician.name} />
            <AvatarFallback>{physician.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className={`text-xl font-bold ${textColor}`}>{physician.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{physician.credentials}</p>
            <p className="text-sm text-gray-700">{physician.institution}</p>
          </div>
        </div>
      )}

      {!showPhysician && (
        <div className="mb-6">
          <h4 className={`text-2xl font-bold ${textColor} mb-4 flex items-center justify-center`}>
            <Icon className="mr-2 h-5 w-5" />
            {position}
          </h4>
        </div>
      )}

      <div className="space-y-3">
        <h5 className="font-semibold text-gray-800 mb-3">Key Arguments:</h5>
        
        {argumentsList.map((argument, index) => (
          <AccordionArgument
            key={index}
            title={argument.title}
            points={argument.points}
            color={color}
          />
        ))}
      </div>

      <Card className={`mt-6 ${bgColor} rounded-lg p-4`}>
        <h6 className={`font-semibold ${textColor} mb-2 flex items-center`}>
          <ClipboardList className="mr-2 h-4 w-4" />
          Guidelines for this view:
        </h6>
        <p className="text-sm text-gray-700">
          {guidelines}
        </p>
      </Card>
    </div>
  );
}
