import attentionSrc from '@/storybook/assets/attention.svg?url'
import emptyStateSrc from '@/storybook/assets/empty-state.svg?url'
import generalErrorSrc from '@/storybook/assets/general-error.svg?url'
import noConnectionSrc from '@/storybook/assets/no-connection.svg?url'
import questionSrc from '@/storybook/assets/question.svg?url'
import sentSuccessSrc from '@/storybook/assets/sent-success.svg?url'
import successPaymentSrc from '@/storybook/assets/success-payment.svg?url'
import verifyBusinessSrc from '@/storybook/assets/verify-business.svg?url'
import resendInvoiceSrc from '@/storybook/assets/resend-invoice.svg?url'
import downloadTransactionSrc from '@/storybook/assets/download-transaction.svg?url'
import uploadTransactionSrc from '@/storybook/assets/upload-transaction.svg?url'
import deleteSrc from '@/storybook/assets/delete.svg?url'

const ASSET_RECORDS = {
  attentionSrc: attentionSrc.toString(),
  emptyStateSrc: emptyStateSrc.toString(),
  generalErrorSrc: generalErrorSrc.toString(),
  noConnectionSrc: noConnectionSrc.toString(),
  questionSrc: questionSrc.toString(),
  sentSuccessSrc: sentSuccessSrc.toString(),
  successPaymentSrc: successPaymentSrc.toString(),
  verifyBusinessSrc: verifyBusinessSrc.toString(),
  resendInvoiceSrc: resendInvoiceSrc.toString(),
  downloadTransactionSrc: downloadTransactionSrc.toString(),
  uploadTransactionSrc: uploadTransactionSrc.toString(),
  deleteSrc: deleteSrc.toString(),
}

type AssetKeys = keyof typeof ASSET_RECORDS
const ASSET_NAMES: AssetKeys[] = Array.from(Object.keys(ASSET_RECORDS)) as AssetKeys[]
export const illustrationOf = (key: AssetKeys) => ASSET_RECORDS[key]

export {
  attentionSrc,
  deleteSrc,
  emptyStateSrc,
  generalErrorSrc,
  noConnectionSrc,
  questionSrc,
  sentSuccessSrc,
  successPaymentSrc,
  verifyBusinessSrc,
  resendInvoiceSrc,
  downloadTransactionSrc,
  uploadTransactionSrc,
  ASSET_NAMES,
}
