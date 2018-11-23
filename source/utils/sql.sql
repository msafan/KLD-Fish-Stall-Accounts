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
	[Date] [datetimeoffset] not null,
	[Amount] [float] not null,
	[Remarks] [nvarchar](100) not null,
	constraint [PK_CashVoucher_ID] primary key clustered ([ID] asc),
	constraint [FK_CashVoucher_Customer] foreign key ([FK_ID_Customer]) references [dbo].[Customer] ([ID])
)

create table [dbo].[Invoice]
(
	[ID] [int] identity(1,1) not null,
	[FK_ID_Customer] [int] not null,
	[Date] [datetimeoffset] not null,
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

-------------------------------------------Indexes------------------------------------------------------------------------------------------------------

create index [IX_User_UserID] on [dbo].[User] ([UserID]);
create index [IX_User_Password] on [dbo].[User] ([Password]);
create index [IX_CashVoucher_FK_ID_Customer] on [dbo].[CashVoucher] ([FK_ID_Customer]);
create index [IX_CashVoucher_Date] on [dbo].[CashVoucher] ([Date]);
create index [IX_Invoice_FK_ID_Customer] on [dbo].[Invoice] ([FK_ID_Customer]);
create index [IX_Invoice_Date] on [dbo].[Invoice] ([Date]);
create index [IX_InvoiceItem_FK_ID_Invoice] on [dbo].[InvoiceItem] ([FK_ID_Invoice]);

-------------------------------------------Stored Procedures--------------------------------------------------------------------------------------------

use [KLDFishStallAccounts]
go