import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Crown, Building2, Copy, LogIn } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';

interface DemoUser {
  email: string;
  password: string;
  role: 'ROOT_OWNER' | 'CARWASH_OWNER';
  name: string;
  description: string;
  icon: any;
}

interface DemoCredentialsProps {
  onQuickLogin?: (email: string, password: string) => void;
  showQuickLogin?: boolean;
}

const demoUsers: DemoUser[] = [
  {
    email: 'admin@letwash.com',
    password: 'Letwash123!',
    role: 'ROOT_OWNER',
    name: 'Letwash Admin',
    description: 'Full platform access, all features, commission dashboard',
    icon: Crown
  },
  {
    email: 'owner1@letwash.com',
    password: 'Letwash123!',
    role: 'CARWASH_OWNER',
    name: 'John Smith (Professional)',
    description: 'Multi-branch owner, 4 business modules, 10% commission',
    icon: Building2
  },
  {
    email: 'owner2@letwash.com',
    password: 'Letwash123!',
    role: 'CARWASH_OWNER',
    name: 'Sarah Johnson (Starter)',
    description: 'Single branch, 2 business modules, 15% commission',
    icon: User
  }
];

export function DemoCredentials({ onQuickLogin, showQuickLogin = true }: DemoCredentialsProps) {
  const [copyingEmail, setCopyingEmail] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: 'email' | 'password', userEmail: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type === 'email' ? 'Email' : 'Password'} copied!`, {
      description: `Copied ${text} to clipboard`
    });
    
    if (type === 'email') {
      setCopyingEmail(userEmail);
      setTimeout(() => setCopyingEmail(null), 2000);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    return role === 'ROOT_OWNER' ? 'default' : 'secondary';
  };

  return (
    <Card className="border-dashed border-2 border-blue-200 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            🎭
          </div>
          Demo Credentials
        </CardTitle>
        <CardDescription>
          Test the platform without SSO - No Google/Apple/Microsoft account needed!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {demoUsers.map((user) => {
          const Icon = user.icon;
          return (
            <Card key={user.email} className="bg-white border-blue-100">
              <CardContent className="pt-4 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs mt-1">
                        {user.role.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground">{user.description}</p>

                {/* Credentials */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded border">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground">Email</div>
                      <div className="font-mono text-xs truncate">{user.email}</div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2"
                      onClick={() => copyToClipboard(user.email, 'email', user.email)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded border">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground">Password</div>
                      <div className="font-mono text-xs">••••••••••</div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2"
                      onClick={() => copyToClipboard(user.password, 'password', user.email)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Quick Login */}
                {showQuickLogin && onQuickLogin && (
                  <Button
                    size="sm"
                    className="w-full"
                    variant="outline"
                    onClick={() => onQuickLogin(user.email, user.password)}
                  >
                    <LogIn className="mr-2 h-3 w-3" />
                    Quick Login as {user.name.split(' ')[0]}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}

        {/* Info */}
        <div className="text-xs text-center text-muted-foreground pt-2">
          💡 <strong>Tip:</strong> Copy credentials and paste into the login form above, or use Quick Login
        </div>
      </CardContent>
    </Card>
  );
}
