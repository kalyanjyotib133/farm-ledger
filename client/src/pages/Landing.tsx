import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  BarChart3, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  Globe, 
  Lock,
  TrendingUp,
  FileText,
  Bell,
  Database
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "MRL Compliance Monitoring",
    description: "Real-time tracking of Maximum Residue Limits with automated violation detection and regulatory compliance reporting."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive dashboards with predictive insights, trend analysis, and compliance forecasting."
  },
  {
    icon: Users,
    title: "Animal Registry Management",
    description: "Complete livestock inventory tracking with individual health records and treatment history."
  },
  {
    icon: AlertTriangle,
    title: "Instant Violation Alerts",
    description: "Immediate notifications for compliance violations with automated escalation workflows."
  },
  {
    icon: CheckCircle,
    title: "Withdrawal Period Tracking",
    description: "Automated calculation and monitoring of drug withdrawal periods with clearance notifications."
  },
  {
    icon: FileText,
    title: "Regulatory Reporting",
    description: "One-click generation of compliance reports for regulatory submissions and audits."
  }
];

const stats = [
  { label: "Farms Protected", value: "2,500+" },
  { label: "Animals Monitored", value: "1.2M+" },
  { label: "Compliance Rate", value: "99.8%" },
  { label: "Cost Savings", value: "$15M+" }
];

export default function Landing() {
  const handleGetStarted = () => {
    window.location.href = '/api/login';
  };

  const handleRequestDemo = () => {
    console.log('Demo requested'); // Mock functionality
    alert('Demo request submitted! Our team will contact you within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AMU</span>
            </div>
            <span className="font-semibold text-lg">AMU/MRL Monitor</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleRequestDemo} data-testid="button-demo">
              Request Demo
            </Button>
            <Button onClick={handleGetStarted} data-testid="button-login">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-5xl">
          <Badge variant="outline" className="mb-6">
            Enterprise-Grade Compliance Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Ensure <span className="text-primary">100% Compliance</span><br />
            with Animal Drug Regulations
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Comprehensive AMU/MRL monitoring platform that automates compliance tracking, 
            reduces regulatory risk, and protects your livestock operation from violations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleGetStarted} data-testid="button-get-started">
              <Zap className="w-5 h-5 mr-2" />
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" onClick={handleRequestDemo} data-testid="button-demo-hero">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Complete Compliance Solution</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to monitor, track, and ensure compliance with animal drug regulations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover-elevate">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose AMU/MRL Monitor?</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Reduce Compliance Risk</h3>
                    <p className="text-muted-foreground">Eliminate manual tracking errors and ensure 100% regulatory compliance with automated monitoring.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Increase Operational Efficiency</h3>
                    <p className="text-muted-foreground">Streamline workflows and reduce administrative overhead by 75% with intelligent automation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Lock className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Enterprise Security</h3>
                    <p className="text-muted-foreground">Bank-grade security with encrypted data storage and comprehensive audit trails.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Global Regulatory Support</h3>
                    <p className="text-muted-foreground">Pre-configured for FDA, USDA, FSSAI, and other international regulatory requirements.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Real-Time Monitoring</h3>
                    <p className="text-sm text-muted-foreground">24/7 automated surveillance</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Continuous monitoring of all drug administrations with instant alerts for potential violations.
                </p>
              </Card>
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Bell className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Smart Notifications</h3>
                    <p className="text-sm text-muted-foreground">Intelligent alert system</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Multi-channel notifications ensure critical compliance events never go unnoticed.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Ensure 100% Compliance?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of livestock operations already using AMU/MRL Monitor to maintain regulatory compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleGetStarted} data-testid="button-get-started-bottom">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" onClick={handleRequestDemo} data-testid="button-contact-sales">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">AMU</span>
                </div>
                <span className="font-semibold">AMU/MRL Monitor</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade compliance monitoring for livestock operations worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Compliance Monitoring</li>
                <li>Animal Registry</li>
                <li>Drug Administration</li>
                <li>Reporting & Analytics</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Documentation</li>
                <li>Training</li>
                <li>24/7 Support</li>
                <li>Implementation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Security</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 AMU/MRL Monitor. All rights reserved. Built for enterprise compliance.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}