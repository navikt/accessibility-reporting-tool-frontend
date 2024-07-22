import { useState } from 'react';
import MyTeam from './MyTeam';
import TeamDashboard from './TeamDashboard';

function ConditionalTeamDashboard(props: { isMyTeam: boolean }) {
  //Vises hvis du ikke er en del av teamet du vil se på.

  const [isMyTeam, setIsMyTeam] = useState(props.isMyTeam); //Sjekk om brukeren er en del av teamet som vises

  if (isMyTeam) {
    return <MyTeam />;
  }

  return <TeamDashboard teamId="someTeam" />;
}

export default ConditionalTeamDashboard;
