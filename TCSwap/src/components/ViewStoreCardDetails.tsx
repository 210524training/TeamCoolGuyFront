import React from 'react';
import CardDetailItemReusable from './card-detail-item-reuse/CardDetailItem.component'

type props = {
    data: any
}


const ViewStoreCardDetails: React.FC<props> = ({ data }) => {
return ( 

    <CardDetailItemReusable data={data}/>
)

}

export default ViewStoreCardDetails;