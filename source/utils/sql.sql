--------------------------------------------Database---------------------------------------------------------------------------------------------------
use [master]
go

create database [KLDFishStallAccounts]
go

-------------------------------------------Tables------------------------------------------------------------------------------------------------------

use [KLDFishStallAccounts]
go

create table [dbo].[Customer]
(
	[ID] [int] identity(1,1) not null,
	[Name] [nvarchar](50) not null,
	[Address] [nvarchar](300) not null,
	[PhoneNumber] [nvarchar](20) not null,
	[Balance] [float] not null,
	constraint [PK_Customer_ID] primary key clustered ([ID] asc),
	constraint [UK_Customer_Name] unique nonclustered([Name] asc)
)

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

create table [dbo].[User]
(
	[ID] [int] identity(1,1) not null,
	[Name] [nvarchar](50) not null,
	[UserID] [nvarchar](30) not null,
	[Password] [nvarchar](100) not null,
	constraint [PK_User_ID] primary key clustered ([ID] asc),
	constraint [UK_User_UserID] unique nonclustered([UserID] asc)
)

create table [dbo].[Fish]
(
	[ID] [int] identity(1,1) not null,
	[Name] [nvarchar](50) not null,
	constraint [PK_Fish_ID] primary key clustered ([ID] asc),
	constraint [UK_Fish_Name] unique nonclustered([Name] asc)
)

create table [dbo].[CashVoucher]
(
	[ID] [int] identity(1,1) not null,
	[FK_ID_Customer] [int] not null,
	[Date] [datetime] not null,
	[Amount] [float] not null,
	[Remarks] [nvarchar](100) not null,
	constraint [PK_CashVoucher_ID] primary key clustered ([ID] asc),
	constraint [FK_CashVoucher_Customer] foreign key ([FK_ID_Customer]) references [dbo].[Customer] ([ID])
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

create table [dbo].[Invoice]
(
	[ID] [int] identity(1,1) not null,
	[FK_ID_Customer] [int] not null,
	[Date] [datetime] not null,
	[Discount] [float] not null,
	[Total] [float] not null,
	[Balance] [float] not null,
	constraint [PK_Invoice_ID] primary key clustered ([ID] asc),
	constraint [FK_Invoice_Customer] foreign key ([FK_ID_Customer]) references [dbo].[Customer] ([ID])
)

create table [dbo].[InvoiceItem]
(
	[ID] [int] identity(1,1) not null,
	[FK_ID_Invoice] [int] not null,
	[FK_ID_Fish] [int] not null,
	[Quantity] [float] not null,
	[Rate] [float] not null,
	[Total] [float] not null,
	constraint [PK_InvoiceItem_ID] primary key clustered ([ID] asc),
	constraint [FK_InvoiceItem_Invoice] foreign key ([FK_ID_Invoice]) references [dbo].[Invoice] ([ID]) on delete cascade,
	constraint [FK_InvoiceItem_Fish] foreign key ([FK_ID_Fish]) references [dbo].[Fish] ([ID])
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

-------------------------------------------Indexes------------------------------------------------------------------------------------------------------

create index [IX_User_UserID] on [dbo].[User] ([UserID]);
create index [IX_User_Password] on [dbo].[User] ([Password]);
create index [IX_CashVoucher_FK_ID_Customer] on [dbo].[CashVoucher] ([FK_ID_Customer]);
create index [IX_CashVoucher_Date] on [dbo].[CashVoucher] ([Date]);
create index [IX_Invoice_FK_ID_Customer] on [dbo].[Invoice] ([FK_ID_Customer]);
create index [IX_Invoice_Date] on [dbo].[Invoice] ([Date]);
create index [IX_InvoiceItem_FK_ID_Invoice] on [dbo].[InvoiceItem] ([FK_ID_Invoice]);
create index [IX_PaymentVoucher_FK_ID_Supplier] on [dbo].[PaymentVoucher] ([FK_ID_Supplier]);
create index [IX_PaymentVoucher_Date] on [dbo].[PaymentVoucher] ([Date]);
create index [IX_PurchaseInvoice_FK_ID_Supplier] on [dbo].[PurchaseInvoice] ([FK_ID_Supplier]);
create index [IX_PurchaseInvoice_Date] on [dbo].[PurchaseInvoice] ([Date]);
create index [IX_PurchaseInvoiceItem_FK_ID_PurchaseInvoice] on [dbo].[PurchaseInvoiceItem] ([FK_ID_PurchaseInvoice]);

-------------------------------------------Stored Procedures--------------------------------------------------------------------------------------------

use [KLDFishStallAccounts]
go

-------------------------------------------Default Data-------------------------------------------------------------------------------------------------

use [KLDFishStallAccounts]
go

INSERT INTO [dbo].[User] ([Name],[UserID],[Password]) VALUES ('KLD Fish Stall Admin','admin','lWz+ZN1fCiZdfxvjtTwr6iNWpUFR3Hk5onQmOLRM5nU=')