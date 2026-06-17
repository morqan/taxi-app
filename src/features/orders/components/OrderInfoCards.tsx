import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import type { Order, OrderStatus } from '@/api/types';
import { Card } from '@/components/ui/Card';

// Статус заказа — серверный enum; человекочитаемая подпись локализуется по ключу.
const STATUS_LABEL_KEYS: Record<OrderStatus, string> = {
  searching: 'driverOrder.statusLabels.searching',
  accepted: 'driverOrder.statusLabels.accepted',
  in_progress: 'driverOrder.statusLabels.inProgress',
  completed: 'driverOrder.statusLabels.completed',
  cancelled: 'driverOrder.statusLabels.cancelled',
};

export function OrderInfoCards({ order }: { order: Order }) {
  const { t } = useTranslation();

  return (
    <>
      <Card className="mb-3">
        <Text className="text-sm text-muted">{t('driverOrder.route')}</Text>
        {/* startPlace / endPlace — реальные адреса Баку, контент, не локализуем */}
        <Text className="text-base font-medium text-text">{order.startPlace}</Text>
        <Text className="text-base font-medium text-text">→ {order.endPlace}</Text>
      </Card>

      <Card className="mb-3 flex-row justify-between">
        <View>
          <Text className="text-sm text-muted">{t('driverOrder.status')}</Text>
          <Text className="text-base font-medium text-text">
            {t(STATUS_LABEL_KEYS[order.status])}
          </Text>
        </View>
        <View>
          <Text className="text-sm text-muted">{t('driverOrder.price')}</Text>
          {/* price + currency (AZN) — данные заказа */}
          <Text className="text-base font-medium text-text">
            {order.price} {order.currency}
          </Text>
        </View>
      </Card>
    </>
  );
}
