"use client"

import InvoiceHeader from '@/components/invoice/InvoiceHeader'
import BrandUpload from '@/components/invoice/BrandUpload'
import IssueDueDateSection from '@/components/invoice/IssueDueDateSection'
import InvoiceDetailsSection from '@/components/invoice/InvoiceDetailsSection'
import InvoiceFromSection from '@/components/invoice/InvoiceFromSection'
import InvoiceToSection from '@/components/invoice/InvoiceToSection'
import ItemsTableSection from '@/components/invoice/ItemsTableSection'
import InvoiceNoteSection from '@/components/invoice/InvoiceNoteSection'
import GrandTotalCard from '@/components/invoice/GrandTotalCard'
import PaymentMethodCard from '@/components/invoice/PaymentMethodCard'
import CurrencyDiscountCard from '@/components/invoice/CurrencyDiscountCard'
import CancelInvoiceCard from '@/components/invoice/CancelInvoiceCard'

export default function CreateInvoicePage() {
    return (
        <>
        <div className="main-content">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="card invoice-container">
                            <InvoiceHeader />
                            <div className="card-body p-0">
                                <div className="px-4 pt-4">
                                    <div className="d-md-flex align-items-center justify-content-between">
                                        <BrandUpload />
                                        <IssueDueDateSection />
                                    </div>
                                </div>
                                <hr className="border-dashed" />
                                <InvoiceDetailsSection />
                                <hr className="border-dashed" />
                                <div className="row px-4 justify-content-between">
                                    <InvoiceFromSection />
                                    <InvoiceToSection />
                                </div>
                                <hr className="border-dashed" />
                                <ItemsTableSection />
                                <hr className="border-dashed" />
                                <InvoiceNoteSection />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <GrandTotalCard />
                        <PaymentMethodCard />
                        <CurrencyDiscountCard />
                        <CancelInvoiceCard />
                    </div>
                </div>
            </div>        
        </>
    )
}