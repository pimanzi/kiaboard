import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function UpgradeCard() {
  const { t } = useTranslation('sidebar');

  return (
    <Card className="max-w-70 overflow-hidden p-0">
      <img
        src="/images/logos/prom_kia.webp"
        alt="Upgrade"
        className="w-full h-24 object-cover"
      />
      <div className="bg-white dark:bg-surface px-3.5 py-3 text-center">
        <h3 className="text-ink dark:text-foreground font-semibold text-[13px] mb-1">
          {t('upgradeTitle')}
        </h3>
        <p className="text-slate text-[11px] leading-[1.3] mb-2.5">
          {t('upgradeDescription')}
        </p>
        <Button className="w-full py-1.5 bg-[#3A4149] hover:bg-[#3A4149]/90 text-white font-medium text-[12px] rounded-lg">
          {t('upgradeButton')}
        </Button>
      </div>
    </Card>
  );
}
