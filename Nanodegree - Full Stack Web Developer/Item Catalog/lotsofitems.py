from sqlalchemy import create_engine, asc
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Item
import datetime

engine = create_engine('sqlite:///catalogwithusers.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

item = Item(name="Ball", description="Round Ball.",
            category="Sports",
            date=datetime.datetime.now()-datetime.timedelta(days=1),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Glass", description="Glass to drink.",
            category="Kitchen Utensils",
            date=datetime.datetime.now()-datetime.timedelta(hours=1),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Pen", description="Pen to play.",
            category="Stationery Items",
            date=datetime.datetime.now()-datetime.timedelta(days=2),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="USB Cable", description="Normal USB2.0 cable.",
            category="Electronics",
            date=datetime.datetime.now()-datetime.timedelta(seconds=40),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="External Hard drive",
            description="200GiB External Hard drive.",
            category="Electronics",
            date=datetime.datetime.now()-datetime.timedelta(days=24),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Table", description="Normal Round Table.",
            category="Furnitrue",
            date=datetime.datetime.now()-datetime.timedelta(weeks=3),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Ball2", description="Round Ball.",
            category="Sports2",
            date=datetime.datetime.now()-datetime.timedelta(days=1),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Glass2", description="Glass to drink.",
            category="Kitchen Utensils",
            date=datetime.datetime.now()-datetime.timedelta(hours=1),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Pen2", description="Pen to play.",
            category="Stationery Items",
            date=datetime.datetime.now()-datetime.timedelta(days=2),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="USB Cable2", description="Normal USB2.0 cable.",
            category="Electronics2",
            date=datetime.datetime.now()-datetime.timedelta(seconds=40),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="External Hard drive2",
            description="200GiB External Hard drive.",
            category="Electronics",
            date=datetime.datetime.now()-datetime.timedelta(days=24),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Table2", description="Normal Round Table.",
            category="Furnitrue",
            date=datetime.datetime.now()-datetime.timedelta(weeks=3),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Ball3", description="Round Ball.",
            category="Sports",
            date=datetime.datetime.now()-datetime.timedelta(days=1),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Glass3", description="Glass to drink.",
            category="Kitchen Utensils2",
            date=datetime.datetime.now()-datetime.timedelta(hours=1),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Pen3", description="Pen to play.",
            category="Stationery Items2",
            date=datetime.datetime.now()-datetime.timedelta(days=2),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="USB Cable3", description="Normal USB2.0 cable.",
            category="Electronics",
            date=datetime.datetime.now()-datetime.timedelta(seconds=40),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="External Hard drive3",
            description="200GiB External Hard drive.",
            category="Electronics",
            date=datetime.datetime.now()-datetime.timedelta(days=24),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Table3", description="Normal Round Table.",
            category="Furnitrue2",
            date=datetime.datetime.now()-datetime.timedelta(weeks=3),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Ball4", description="Round Ball.",
            category="Sports",
            date=datetime.datetime.now()-datetime.timedelta(days=1),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Glass4", description="Glass to drink.",
            category="Kitchen Utensils",
            date=datetime.datetime.now()-datetime.timedelta(hours=1),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Pen4", description="Pen to play.",
            category="Stationery Items",
            date=datetime.datetime.now()-datetime.timedelta(days=2),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="USB Cable4", description="Normal USB2.0 cable.",
            category="Electronics",
            date=datetime.datetime.now()-datetime.timedelta(seconds=40),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="External Hard drive4",
            description="200GiB External Hard drive.",
            category="Electronics",
            date=datetime.datetime.now()-datetime.timedelta(days=24),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Table4", description="Normal Round Table.",
            category="Furnitrue",
            date=datetime.datetime.now()-datetime.timedelta(weeks=3),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Ball24", description="Round Ball.",
            category="Sports2",
            date=datetime.datetime.now()-datetime.timedelta(days=1),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Glass24", description="Glass to drink.",
            category="Kitchen Utensils",
            date=datetime.datetime.now()-datetime.timedelta(hours=1),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Pen24", description="Pen to play.",
            category="Stationery Items",
            date=datetime.datetime.now()-datetime.timedelta(days=2),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="USB Cable24", description="Normal USB2.0 cable.",
            category="Electronics2",
            date=datetime.datetime.now()-datetime.timedelta(seconds=40),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="External Hard drive24",
            description="200GiB External Hard drive.",
            category="Electronics",
            date=datetime.datetime.now()-datetime.timedelta(days=24),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Table24", description="Normal Round Table.",
            category="Furnitrue",
            date=datetime.datetime.now()-datetime.timedelta(weeks=3),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Ball34", description="Round Ball.",
            category="Sports",
            date=datetime.datetime.now()-datetime.timedelta(days=1),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Glass34", description="Glass to drink.",
            category="Kitchen Utensils2",
            date=datetime.datetime.now()-datetime.timedelta(hours=1),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Pen34", description="Pen to play.",
            category="Stationery Items2",
            date=datetime.datetime.now()-datetime.timedelta(days=2),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="USB Cable34", description="Normal USB2.0 cable.",
            category="Electronics",
            date=datetime.datetime.now()-datetime.timedelta(seconds=40),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="External Hard drive34",
            description="200GiB External Hard drive.",
            category="Electronics",
            date=datetime.datetime.now()-datetime.timedelta(days=24),
            user_id=1)
session.add(item)
session.commit()

item = Item(name="Table34", description="Normal Round Table.",
            category="Furnitrue2",
            date=datetime.datetime.now()-datetime.timedelta(weeks=3),
            user_id=1)
session.add(item)
session.commit()
