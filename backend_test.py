#!/usr/bin/env python3
"""
Backend API Testing for TaxcService
Tests all backend endpoints: GET /api/health, POST /api/quote, GET /api/quotes
"""

import requests
import json
import uuid
from datetime import datetime, timedelta

# Backend URL from environment
BASE_URL = "https://taxc-staging.preview.emergentagent.com"

def test_health_endpoint():
    """Test GET /api/health endpoint"""
    print("\n=== Testing GET /api/health ===")
    try:
        response = requests.get(f"{BASE_URL}/api/health", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'ok' and 'service' in data and 'timestamp' in data:
                print("✅ Health check endpoint working correctly")
                return True
            else:
                print("❌ Health check response missing required fields")
                return False
        else:
            print(f"❌ Health check failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Health check error: {str(e)}")
        return False

def test_quote_submission_valid():
    """Test POST /api/quote with valid data"""
    print("\n=== Testing POST /api/quote (Valid Data) ===")
    
    # Generate realistic test data
    test_data = {
        "firstName": "Sarah Johnson",
        "email": "sarah.johnson@example.com",
        "phone": "+64 21 123 4567",
        "pickupAddress": "Auckland Airport (AKL), Ray Emery Dr, Auckland 2022",
        "dropoffAddress": "SkyCity Hotel, 90 Federal St, Auckland CBD",
        "travelDate": (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d"),
        "passengers": "2",
        "flightNumber": "NZ123",
        "returnRequired": "yes",
        "bags": "2 large suitcases"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/quote",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=15
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and 'quoteId' in data:
                print("✅ Quote submission successful")
                return True, data.get('quoteId')
            else:
                print("❌ Quote submission response missing success/quoteId")
                return False, None
        else:
            print(f"❌ Quote submission failed with status {response.status_code}")
            return False, None
            
    except Exception as e:
        print(f"❌ Quote submission error: {str(e)}")
        return False, None

def test_quote_submission_missing_fields():
    """Test POST /api/quote with missing required fields"""
    print("\n=== Testing POST /api/quote (Missing Required Fields) ===")
    
    # Test data missing required field 'email'
    test_data = {
        "firstName": "John Doe",
        "phone": "+64 21 987 6543",
        "pickupAddress": "Auckland Airport",
        "dropoffAddress": "City Center",
        "travelDate": (datetime.now() + timedelta(days=5)).strftime("%Y-%m-%d"),
        "passengers": "1"
        # Missing email field
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/quote",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if 'error' in data and 'email' in data['error'].lower():
                print("✅ Validation correctly rejected missing email field")
                return True
            else:
                print("❌ Expected email validation error not found")
                return False
        else:
            print(f"❌ Expected 400 status code, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Validation test error: {str(e)}")
        return False

def test_get_quotes():
    """Test GET /api/quotes endpoint"""
    print("\n=== Testing GET /api/quotes ===")
    
    try:
        response = requests.get(f"{BASE_URL}/api/quotes", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if 'quotes' in data and isinstance(data['quotes'], list):
                print(f"✅ Get quotes successful - Found {len(data['quotes'])} quotes")
                
                # Check if quotes have expected structure
                if len(data['quotes']) > 0:
                    quote = data['quotes'][0]
                    required_fields = ['id', 'firstName', 'email', 'phone', 'pickupAddress', 
                                     'dropoffAddress', 'travelDate', 'passengers', 'createdAt']
                    missing_fields = [field for field in required_fields if field not in quote]
                    
                    if missing_fields:
                        print(f"⚠️ Quote structure missing fields: {missing_fields}")
                    else:
                        print("✅ Quote structure is correct")
                
                return True
            else:
                print("❌ Get quotes response missing 'quotes' array")
                return False
        else:
            print(f"❌ Get quotes failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Get quotes error: {str(e)}")
        return False

def test_quote_persistence():
    """Test that submitted quotes are persisted and retrievable"""
    print("\n=== Testing Quote Persistence ===")
    
    # First, get current quote count
    try:
        initial_response = requests.get(f"{BASE_URL}/api/quotes", timeout=10)
        if initial_response.status_code == 200:
            initial_count = len(initial_response.json().get('quotes', []))
            print(f"Initial quote count: {initial_count}")
        else:
            print("❌ Could not get initial quote count")
            return False
    except Exception as e:
        print(f"❌ Error getting initial quotes: {str(e)}")
        return False
    
    # Submit a new quote
    test_data = {
        "firstName": "Emma Wilson",
        "email": "emma.wilson@test.com",
        "phone": "+64 27 555 0123",
        "pickupAddress": "Christchurch Airport, Memorial Ave, Christchurch",
        "dropoffAddress": "The George Hotel, 50 Park Terrace, Christchurch",
        "travelDate": (datetime.now() + timedelta(days=10)).strftime("%Y-%m-%d"),
        "passengers": "3",
        "returnRequired": "no"
    }
    
    try:
        submit_response = requests.post(
            f"{BASE_URL}/api/quote",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=15
        )
        
        if submit_response.status_code != 200:
            print(f"❌ Quote submission failed: {submit_response.status_code}")
            return False
            
        quote_id = submit_response.json().get('quoteId')
        print(f"Submitted quote with ID: {quote_id}")
        
        # Wait a moment for database write
        import time
        time.sleep(1)
        
        # Check if quote count increased
        final_response = requests.get(f"{BASE_URL}/api/quotes", timeout=10)
        if final_response.status_code == 200:
            final_quotes = final_response.json().get('quotes', [])
            final_count = len(final_quotes)
            print(f"Final quote count: {final_count}")
            
            if final_count > initial_count:
                # Look for our submitted quote
                submitted_quote = None
                for quote in final_quotes:
                    if quote.get('id') == quote_id:
                        submitted_quote = quote
                        break
                
                if submitted_quote:
                    print("✅ Quote successfully persisted and retrievable")
                    print(f"Found quote: {submitted_quote.get('firstName')} - {submitted_quote.get('email')}")
                    return True
                else:
                    print("❌ Quote not found in database despite successful submission")
                    return False
            else:
                print("❌ Quote count did not increase after submission")
                return False
        else:
            print(f"❌ Could not retrieve quotes after submission: {final_response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Persistence test error: {str(e)}")
        return False

def run_all_tests():
    """Run all backend tests and provide summary"""
    print("🚀 Starting TaxcService Backend API Tests")
    print(f"Testing against: {BASE_URL}")
    
    results = {}
    
    # Test health endpoint
    results['health'] = test_health_endpoint()
    
    # Test quote submission with valid data
    results['quote_valid'], quote_id = test_quote_submission_valid()
    
    # Test quote submission validation
    results['quote_validation'] = test_quote_submission_missing_fields()
    
    # Test get quotes endpoint
    results['get_quotes'] = test_get_quotes()
    
    # Test quote persistence
    results['persistence'] = test_quote_persistence()
    
    # Summary
    print("\n" + "="*50)
    print("📊 TEST SUMMARY")
    print("="*50)
    
    passed = sum(1 for result in results.values() if result)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.upper()}: {status}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend tests PASSED!")
        return True
    else:
        print("⚠️ Some backend tests FAILED!")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    exit(0 if success else 1)