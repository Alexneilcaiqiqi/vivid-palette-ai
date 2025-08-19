import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Smartphone, 
  DollarSign,
  Apple,
  Chrome
} from "lucide-react";

interface PaymentMethodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan: {
    name: string;
    price: string;
    period: string;
  } | null;
}

const PaymentMethodDialog = ({ open, onOpenChange, selectedPlan }: PaymentMethodDialogProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const paymentMethods = [
    {
      id: "wechat",
      name: "微信支付",
      icon: <Smartphone className="w-6 h-6" />,
      description: "使用微信快速支付",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "alipay_hk",
      name: "香港支付宝",
      icon: <DollarSign className="w-6 h-6" />,
      description: "支付宝(香港)便捷支付",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: <CreditCard className="w-6 h-6" />,
      description: "全球通用在线支付",
      color: "from-blue-600 to-indigo-600"
    },
    {
      id: "google_pay",
      name: "Google Pay",
      icon: <Chrome className="w-6 h-6" />,
      description: "Google 快速支付",
      color: "from-red-500 to-orange-500"
    },
    {
      id: "apple_pay",
      name: "Apple Pay",
      icon: <Apple className="w-6 h-6" />,
      description: "Apple 设备专用支付",
      color: "from-gray-600 to-gray-800"
    },
    {
      id: "stripe",
      name: "Stripe",
      icon: <CreditCard className="w-6 h-6" />,
      description: "信用卡/借记卡支付",
      color: "from-purple-500 to-violet-500"
    }
  ];

  const handlePayment = () => {
    if (!selectedMethod || !selectedPlan) return;
    
    // 这里可以根据不同的支付方式跳转到对应的支付页面
    console.log(`选择的套餐: ${selectedPlan.name}, 支付方式: ${selectedMethod}`);
    
    // 模拟跳转到支付页面
    window.location.href = `/payment?plan=${selectedPlan.name}&method=${selectedMethod}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-lg border border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            选择支付方式
          </DialogTitle>
          {selectedPlan && (
            <div className="text-center mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-lg font-semibold text-foreground">
                {selectedPlan.name}
              </p>
              <p className="text-2xl font-bold text-gradient">
                {selectedPlan.price}{selectedPlan.period}
              </p>
            </div>
          )}
        </DialogHeader>
        
        <div className="space-y-3 mt-6">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                selectedMethod === method.id
                  ? 'border-primary bg-primary/10 shadow-lg'
                  : 'border-border hover:border-primary/50 bg-card/50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${method.color} text-white`}>
                  {method.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{method.name}</h3>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  selectedMethod === method.id
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground'
                }`}>
                  {selectedMethod === method.id && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          <Button
            onClick={handlePayment}
            disabled={!selectedMethod}
            className="w-full bg-gradient-primary hover:shadow-strong disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            确认支付
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-full border-primary/30 hover:bg-primary/10"
            size="lg"
          >
            取消
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            支付过程安全加密，支持7天无忧退款
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodDialog;