'use client';

import { getGravatarUrl } from '@/auth/gravatar';
import { useTeam, useTeams } from '@/auth/hooks/useTeam';
import { useUser } from '@/auth/hooks/useUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';

export function NavCompany() {
  const { data: company } = useTeam();
  const { data: teams } = useTeams();

  const { data: user, mutate: mutateUser } = useUser();
  const { data: activeTeam, mutate: mutateActiveTeam } = useTeam();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              side='left'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='w-8 h-8 rounded-lg'>
                <AvatarImage src={getGravatarUrl(user?.email)} alt={user?.first_name} />
                <AvatarFallback className='rounded-lg'>{userInitials(company ? company?.name : 'Company')}</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-sm leading-tight text-left'>
                <span className='font-semibold capitalize truncate'>{company ? company.name : 'Company'}</span>
              </div>
              <CaretSortIcon className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side='top'
            align='center'
          >
            <DropdownMenuLabel>Switch Team</DropdownMenuLabel>
            {teams.map((team) => (
              <DropdownMenuItem
                key={team.id}
                className={cn('capitalize', team.id == activeTeam?.id && 'bg-muted')}
                onClick={() => {
                  mutateUser();
                  mutateActiveTeam();
                }}
              >
                {team.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function userInitials(name: string): string {
  return (
    name && `${name.split(' ')[0][0].toUpperCase()}${name.split(' ').length > 1 && name.split(' ')[1][0].toUpperCase()}`
  );
}
