create table [dbo].[Supplier]
(
	[ID] [int] identity(1,1) not null,
	[Name] [nvarchar](50) not null,
	[Address] [nvarchar](300) not null,
	[PhoneNumber] [nvarchar](20) not null,
	[Balance] [float] not null,
	constraint [PK_Supplier_ID] primary key clustered ([ID] asc),
	constraint [UK_Supplier_Name] unique nonclustered([Name] asc)
)

create table [dbo].[PaymentVoucher]
(
	[ID] [int] identity(1,1) not null,
	[FK_ID_Supplier] [int] not null,
	[Date] [datetime] not null,
	[Amount] [float] not null,
	[Remarks] [nvarchar](100) not null,
	constraint [PK_PaymentVoucher_ID] primary key clustered ([ID] asc),
	constraint [FK_PaymentVoucher_Supplier] foreign key ([FK_ID_Supplier]) references [dbo].[Supplier] ([ID])
)

create table [dbo].[PurchaseInvoice]
(
	[ID] [int] identity(1,1) not null,
	[FK_ID_Supplier] [int] not null,
	[Date] [datetime] not null,
	[Discount] [float] not null,
	[Total] [float] not null,
	[Balance] [float] not null,
	constraint [PK_PurchaseInvoice_ID] primary key clustered ([ID] asc),
	constraint [FK_PurchaseInvoice_Supplier] foreign key ([FK_ID_Supplier]) references [dbo].[Supplier] ([ID])
)

create table [dbo].[PurchaseInvoiceItem]
(
	[ID] [int] identity(1,1) not null,
	[FK_ID_PurchaseInvoice] [int] not null,
	[FK_ID_Fish] [int] not null,
	[Quantity] [float] not null,
	[Rate] [float] not null,
	[Total] [float] not null,
	constraint [PK_PurchaseInvoiceItem_ID] primary key clustered ([ID] asc),
	constraint [FK_PurchaseInvoiceItem_PurchaseInvoice] foreign key ([FK_ID_PurchaseInvoice]) references [dbo].[PurchaseInvoice] ([ID]) on delete cascade,
	constraint [FK_PurchaseInvoiceItem_Fish] foreign key ([FK_ID_Fish]) references [dbo].[Fish] ([ID])
)


create index [IX_PaymentVoucher_FK_ID_Supplier] on [dbo].[PaymentVoucher] ([FK_ID_Supplier]);
create index [IX_PaymentVoucher_Date] on [dbo].[PaymentVoucher] ([Date]);
create index [IX_PurchaseInvoice_FK_ID_Supplier] on [dbo].[PurchaseInvoice] ([FK_ID_Supplier]);
create index [IX_PurchaseInvoice_Date] on [dbo].[PurchaseInvoice] ([Date]);
create index [IX_PurchaseInvoiceItem_FK_ID_PurchaseInvoice] on [dbo].[PurchaseInvoiceItem] ([FK_ID_PurchaseInvoice]);