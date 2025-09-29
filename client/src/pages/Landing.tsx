import { Button } from "@/components/ui/button";
import {
  Shield,
  BarChart3,
  Users,
  AlertTriangle,
  CheckCircle,
  FileText,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "MRL Compliance",
    description: "Real-time tracking of Maximum Residue Limits.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Dashboards with predictive insights and trends.",
  },
  {
    icon: Users,
    title: "Animal Registry",
    description: "Complete livestock inventory and health records.",
  },
  {
    icon: AlertTriangle,
    title: "Violation Alerts",
    description: "Immediate notifications for compliance violations.",
  },
  {
    icon: CheckCircle,
    title: "Withdrawal Tracking",
    description: "Automated monitoring of drug withdrawal periods.",
  },
  {
    icon: FileText,
    title: "Regulatory Reporting",
    description: "One-click generation of compliance reports.",
  },
];

export default function Landing() {
  const handleAuth = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">AMU</span>
          </div>
          <span className="font-semibold text-lg">AMU/MRL Monitor</span>
        </div>
        <Button onClick={handleAuth} data-testid="button-login">
          Sign In
        </Button>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Automated <span className="text-primary">Compliance</span> for
              Modern Livestock Operations
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our platform simplifies regulatory compliance, reduces risk, and
              enhances operational efficiency with automated AMU/MRL monitoring.
            </p>
            <Button size="lg" onClick={handleAuth} data-testid="button-get-started">
              <Zap className="w-5 h-5 mr-2" />
              Get Started
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Everything You Need for Full Compliance
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From real-time monitoring to automated reporting, our platform
                has you covered.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 AMU/MRL Monitor. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}