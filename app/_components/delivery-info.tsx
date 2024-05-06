import React from 'react'
import { Card } from './ui/card'
import { BikeIcon, TimerIcon } from 'lucide-react'
import { formatCurrency } from '../_helpers/price'
import { Restaurant } from '@prisma/client'

interface DeliveryInfoProps{
    restaurant:Pick<Restaurant, 'deliveryFee' | 'deliveryTimeMinutes'>
}

const DeliveryInfo = ({restaurant}: DeliveryInfoProps) => {
  return (
    <div>
        <Card className="mt-6 flex justify-around py-3">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon size={14} />
            </div>

            <div>
              {Number(restaurant.deliveryFee) > 0 ? (
                <p className="text-xs font-semibold">
                  {formatCurrency(Number(restaurant.deliveryFee))}
                </p>
              ) : (
                <p className="text-sm font-semibold">Grátis</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <TimerIcon size={14} />
            </div>

            <div>
              {Number(restaurant.deliveryTimeMinutes) > 0 ? (
                <p className="text-xs font-semibold">
                  Min: {restaurant.deliveryTimeMinutes}
                </p>
              ) : (
                <p className="text-sm font-semibold">Grátis</p>
              )}
            </div>
          </div>
        </Card>
    </div>
  )
}

export default DeliveryInfo