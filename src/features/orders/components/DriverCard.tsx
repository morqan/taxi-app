import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

import type { Driver } from '@/api/types';
import { Card } from '@/components/ui/Card';

export function DriverCard({ driver }: { driver: Driver | null }) {
  const { t } = useTranslation();

  if (!driver) {
    return (
      <Card className="mb-6">
        <Text className="text-sm text-muted">{t('driverOrder.driverSearching')}</Text>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <Text className="text-sm text-muted">{t('driverOrder.driver')}</Text>
      {/* Имя, машина, рейтинг, телефон — контент, не переводим */}
      <Text className="text-lg font-medium text-text">{driver.name}</Text>
      <Text className="text-sm text-muted">
        {driver.carModel} · {driver.carPlate}
      </Text>
      <Text className="text-sm text-muted">★ {driver.rating}</Text>
      <Text className="text-sm text-muted">{driver.phone}</Text>
    </Card>
  );
}
