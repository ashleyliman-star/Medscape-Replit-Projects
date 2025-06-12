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
  arguments: Argument[];
  guidelines: string;
  showPhysician: boolean;
}

export default function DebateSide({
  position,
  color,
  physician,
  statement,
  arguments,
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
          <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-white shadow-lg">
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

      <Card className="bg-white rounded-lg p-4 mb-6 shadow-sm">
        <h4 className={`font-semibold ${textColor} mb-2 flex items-center`}>
          <Icon className="mr-2 h-4 w-4" />
          {position}
        </h4>
        <p className="text-gray-700 text-sm">
          "{statement}"
        </p>
      </Card>

      <div className="space-y-3">
        <h5 className="font-semibold text-gray-800 mb-3">Key Arguments:</h5>
        
        {arguments.map((argument, index) => (
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
