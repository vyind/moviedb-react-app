import settings from "../settings";
import { useState, useEffect } from "react";
import { CreditDetails } from "../../api/creditDetails";
import Typography from "@material-ui/core/Typography";
import { CreatedBy } from "../../api/tvDetails";

interface CreditsProps {
  typeId: number;
  type: string;
  creator?: CreatedBy[];
}

export default function Credits({ typeId, type, creator }: CreditsProps) {
  const [typeCredits, setTypeCredits] = useState(null);
  useEffect(() => {
    async function loadData() {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${typeId}/credits?api_key=${settings.api_key}`
      );
      const apiData: CreditDetails = await response.json();
      setTypeCredits(apiData);
    }
    loadData();
  }, [typeId]);
  if (!typeCredits) return <span>...</span>;

  const getCrewMembers = (job) => {
    const directors = typeCredits.crew.filter((member) => member.job === job);
    return directors.map((member, index) => {
      if (index === 0) return <span key={index}>{member.name}</span>;
      return <span key={index}> • {member.name}</span>;
    });
  };
  const getCreators = (creators) => {
    return creators.map((member, index) => {
      if (index === 0) return <span key={index}>{member.name}</span>;
      return <span key={index}> • {member.name}</span>;
    });
  };

  return (
    <div>
      <div>
        <Typography display="inline" variant="body2" color="textPrimary">
          <b>Cast:&nbsp;</b>
        </Typography>
        <Typography display="inline" variant="body2" color="textSecondary">
          {typeCredits.cast.map((member, index) => {
            if (index === 0) return <span key={index}>{member.name}</span>;
            if (index <= 10) return <span key={index}> • {member.name}</span>;
            return "";
          })}
        </Typography>
      </div>
      <div>
        <Typography display="inline" variant="body2" color="textPrimary">
          <b>{type === "tv" ? "Creator" : "Director"}(s):&nbsp;</b>
        </Typography>
        <Typography display="inline" variant="body2" color="textSecondary">
          {type === "tv" ? getCreators(creator) : getCrewMembers("Director")}
        </Typography>
      </div>
      <div>
        <Typography display="inline" variant="body2" color="textPrimary">
          <b>Executive Producer(s):&nbsp;</b>
        </Typography>
        <Typography display="inline" variant="body2" color="textSecondary">
          {getCrewMembers("Executive Producer")}
        </Typography>
      </div>
    </div>
  );
}
