"""Database connection management."""
import psycopg2
from psycopg2 import Error
from contextlib import contextmanager
from typing import Tuple
from app.config import get_settings

settings = get_settings()


def get_scholarship_connection():
    """Create connection to scholarship database."""
    try:
        connection = psycopg2.connect(
            host=settings.scholarship_db_host,
            port=settings.scholarship_db_port,
            database=settings.scholarship_db_name,
            user=settings.scholarship_db_user,
            password=settings.scholarship_db_password
        )
        connection.autocommit = True
        return connection
    except Error as e:
        raise Exception(f"Error connecting to scholarship database: {e}")


def get_profile_connection():
    """Create connection to profile database."""
    try:
        connection = psycopg2.connect(
            host=settings.profile_db_host,
            port=settings.profile_db_port,
            database=settings.profile_db_name,
            user=settings.profile_db_user,
            password=settings.profile_db_password
        )
        connection.autocommit = True
        return connection
    except Error as e:
        raise Exception(f"Error connecting to profile database: {e}")


@contextmanager
def get_scholarship_cursor():
    """Context manager for scholarship database cursor."""
    connection = get_scholarship_connection()
    cursor = connection.cursor()
    try:
        yield cursor
    finally:
        cursor.close()
        connection.close()


@contextmanager
def get_profile_cursor():
    """Context manager for profile database cursor."""
    connection = get_profile_connection()
    cursor = connection.cursor()
    try:
        yield cursor
    finally:
        cursor.close()
        connection.close()


@contextmanager
def get_both_cursors():
    """Context manager for both database cursors."""
    sch_conn = get_scholarship_connection()
    prof_conn = get_profile_connection()
    sch_cursor = sch_conn.cursor()
    prof_cursor = prof_conn.cursor()
    
    try:
        yield sch_cursor, prof_cursor
    finally:
        sch_cursor.close()
        prof_cursor.close()
        sch_conn.close()
        prof_conn.close()
