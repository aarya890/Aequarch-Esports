import React from 'react';
import { CreditCard, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import type { Wallet, Transaction } from '../types/tournament';

interface WalletCardProps {
  wallet: Wallet;
  onDeposit: () => void;
  onWithdraw: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet, onDeposit, onWithdraw }) => {
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'DEPOSIT':
        return <ArrowDownLeft className="w-5 h-5 text-green-400" />;
      case 'WITHDRAWAL':
        return <ArrowUpRight className="w-5 h-5 text-red-400" />;
      case 'ENTRY_FEE':
        return <CreditCard className="w-5 h-5 text-yellow-400" />;
      case 'PRIZE':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="glass-effect rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">Wallet Balance</h3>
          <p className="text-4xl font-bold text-blue-400 mt-2">
            ${wallet.balance.toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onDeposit}
            className="btn-neon flex items-center gap-2"
          >
            <ArrowDownLeft className="w-4 h-4" />
            Deposit
          </button>
          <button
            onClick={onWithdraw}
            disabled={wallet.balance <= 0 || wallet.kycStatus !== 'VERIFIED'}
            className="btn-neon flex items-center gap-2 disabled:opacity-50"
          >
            <ArrowUpRight className="w-4 h-4" />
            Withdraw
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Recent Transactions</h4>
        {wallet.transactions.slice(0, 5).map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 rounded-lg bg-white/5"
          >
            <div className="flex items-center gap-3">
              {getTransactionIcon(transaction.type)}
              <div>
                <p className="font-medium">{transaction.type.replace('_', ' ')}</p>
                <p className="text-sm text-gray-400">
                  {new Date(transaction.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-medium ${
                transaction.type === 'WITHDRAWAL' || transaction.type === 'ENTRY_FEE'
                  ? 'text-red-400'
                  : 'text-green-400'
              }`}>
                {transaction.type === 'WITHDRAWAL' || transaction.type === 'ENTRY_FEE' ? '-' : '+'}
                ${transaction.amount}
              </p>
              {transaction.status === 'PENDING' && (
                <div className="flex items-center gap-1 text-sm text-yellow-400">
                  <Clock className="w-4 h-4" />
                  Pending
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletCard;